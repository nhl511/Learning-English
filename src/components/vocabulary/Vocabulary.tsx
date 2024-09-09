"use client";
import "regenerator-runtime/runtime";
import styles from "./vocabulary.module.css";
import React, { useEffect, useState } from "react";
import { UnitType } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLightbulb,
  faRotateLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCorrectTime,
  useHardVocabularyById,
  useSession,
} from "@/customHooks/CustomHooks";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  addHardVocabulary,
  deleteHardVocabulary,
  updateSpeakingTimes,
  updateWritingTimes,
} from "@/libs/actions";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CloseIcon from "@mui/icons-material/Close";

import StopIcon from "@mui/icons-material/Stop";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Vocabulary = ({
  data,
  isLoading,
  page,
  setPage,
  number,
  unit,
  gradeTitle,
  handleOpenModal,
  isReviewing,
  isViSound,
  setIsViSound,
  isReading,
  isTest,
}: {
  data: any;
  isLoading: boolean;
  page: number;
  setPage: any;
  number: number;
  unit?: UnitType;
  gradeTitle?: string;
  handleOpenModal: any;
  isReviewing: boolean;
  isViSound: boolean;
  setIsViSound: any;
  isReading?: boolean;
  isTest?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const { hardVocabularies, mutateHardVocabularies } = useHardVocabularyById(
    data?._id
  );
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { sessionData } = useSession();
  const [gradeInput, setGradeInput] = useState("");
  const [curInput, setCurInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isEndAudio, setIsEndAudio] = useState(false);
  const [scores, setScores] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const { correctTimeData } = useCorrectTime({
    vocabId: data?._id,
    userId: sessionData?.user?.id,
  });
  const {
    listening,
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const handleRecord = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-US",
      });
    }
  };
  const handleAudioEnd = () => {
    setIsEndAudio(true);
  };
  const decreasePage = () => {
    setPage((prev: any) => prev - 1);
    setInputValue("");
    resetTranscript();
  };

  const increasePage = () => {
    setPage((prev: any) => prev + 1);
    setIsCorrect(false);
    setInputValue("");
    resetTranscript();
  };

  useEffect(() => {
    if (data?.word && isTest) {
      setIsEndAudio(false);
      if (isReading) {
        setSeconds(data?.word.length);
      } else {
        setSeconds(data?.word.length * 2);
      }
    }
  }, [data, isTest]);

  useEffect(() => {
    if (page < number && isTest && data?.word) {
      const intervalId = setInterval(
        () => {
          increasePage();
        },
        isReading ? data?.word.length * 1000 : data?.word.length * 1000 * 2
      );

      return () => clearInterval(intervalId);
    }
  }, [isTest, isEndAudio, page, number]);

  useEffect(() => {
    if (isEndAudio && isTest) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isEndAudio, isTest]);

  useEffect(() => {
    if (isTest) setIsViSound(true);
  }, [isTest]);

  useEffect(() => {
    if (inputValue.toUpperCase() === data?.word?.toUpperCase()) {
      if (sessionData) {
        updateWritingTimes(data?._id);
      }
      increasePage();
      if (isTest) setScores((prev) => prev + 1);
    }
  }, [inputValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (transcript.toUpperCase() === data?.word?.toUpperCase()) {
        if (sessionData) {
          updateSpeakingTimes(data?._id);
        }
        increasePage();
        if (isTest) setScores((prev) => prev + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [transcript]);

  useEffect(() => {
    if (transcript.toUpperCase() === data?.word?.toUpperCase()) {
      setIsCorrect(true);
    }
  }, [transcript]);

  useEffect(() => {
    if (page === number) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [page]);

  useEffect(() => {
    setIsHidden(isReviewing);
  }, [isReviewing]);

  useEffect(() => {
    if (isEndAudio && isTest) {
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-US",
      });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isEndAudio, isTest]);

  const handleHint = () => {
    setIsHidden(false);
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const handleHardWord = async () => {
    if (sessionData) {
      if (hardVocabularies) {
        await deleteHardVocabulary(data?._id);
        mutateHardVocabularies();
      } else {
        await addHardVocabulary(data?._id);
        mutateHardVocabularies();
      }
    } else {
      router.push("/login");
    }
  };

  const handleIncreaseUnit = () => {
    const params = new URLSearchParams(searchParams);

    const str: any = unit?.title;
    const match = str.match(/\d+/);
    const number = parseInt(match[0], 10);
    const fetcher = async (gradeId: any, order: number) => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          `/api/get-unit-by-order?gradeId=${gradeId}&order=${order}`
      );
      const data = await res.json();
      return data;
    };
    fetcher(unit?.gradeId, number).then((res) => {
      if (res._id) router.push("/vocabularies/" + res._id + "?" + params);
      else router.push("/");
    });
  };

  useEffect(() => {
    if (number === 0 && unit) {
      router.push("/");
    }
  }, [unit]);

  useEffect(() => {
    if (gradeTitle !== "" && gradeTitle) {
      const [gradePart, curriculumPart] = gradeTitle?.split(" - ");
      setGradeInput(gradePart);
      setCurInput(curriculumPart);
    }
  }, [gradeTitle]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  if (number === 0) return <div className={styles.empty}></div>;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.optionWrapper}>
          <div className={styles.option} onClick={handleOpenModal}>
            Option
          </div>

          <div
            className={`${styles.option} ${styles.close}`}
            onClick={() => router.push("/menu-list/" + unit?._id)}
          >
            <CloseIcon />
          </div>
        </div>
      </div>

      {unit ? (
        <>
          <div className={styles.title}>
            <div className={styles.titleWrapper}>
              <h3>
                {gradeInput} - <span className={styles.cur}>{curInput}</span>
              </h3>
            </div>

            <div className={styles.unitWrapper}>
              <h3>{unit?.title}</h3>
              {!isReviewing ? <p>Studying</p> : <p>Reviewing</p>}
            </div>
          </div>
          <div className={styles.mobileTitle}>
            <h3>
              {gradeInput} - <span className={styles.cur}>{curInput}</span>
            </h3>
            <div className={styles.unitWrapper}>
              <h3>{unit?.title}</h3>
              {!isReviewing ? <p>Studying</p> : <p>Reviewing</p>}
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}

      {isLoading ? (
        <div className={styles.wrapperSkeleton}></div>
      ) : !isDone ? (
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.top}>
              <div className={styles.wordWrapper}>
                <h1 className={`${isHidden && styles.hidden}`}>{data?.word}</h1>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.prop}>
                <h3 className={`${isHidden && styles.hidden}`}>
                  {data?.definition}
                </h3>
              </div>
              <div className={styles.prop}>
                <h3 className={`${isHidden && styles.hidden}`}>
                  {data?.transcription}
                </h3>
              </div>
              <div className={styles.prop}>
                <h3 className={`${isHidden && styles.hidden}`}>
                  {data?.wordType}
                </h3>
              </div>
            </div>
            <div className={styles.audioWrapper}>
              {!isViSound ? (
                <AudioPlayer
                  word={data?.word}
                  autoPlay={true}
                  lang="en"
                  onAudioEnd={handleAudioEnd}
                />
              ) : (
                <AudioPlayer
                  word={data?.definition}
                  autoPlay={true}
                  lang="vi"
                  onAudioEnd={handleAudioEnd}
                />
              )}
            </div>
          </div>
          <div className={styles.actionButtonWrapper}>
            {!isTest &&
              (isReviewing ? (
                <div className={styles.hint} onClick={handleHint}>
                  <FontAwesomeIcon icon={faLightbulb} />
                  Hint
                </div>
              ) : (
                <div className={styles.star} onClick={handleHardWord}>
                  <FontAwesomeIcon
                    icon={hardVocabularies ? faStar : far.faStar}
                    className={styles.starIcon}
                  />
                </div>
              ))}
          </div>
          {sessionData && (
            <div className={styles.correctTimeWrapper}>
              {!isReading ? (
                <p>
                  Writing times:{" "}
                  {correctTimeData?.length && correctTimeData[0].writingTimes}
                </p>
              ) : (
                <p>
                  Speaking times:{" "}
                  {correctTimeData?.length && correctTimeData[0].speakingTimes}
                </p>
              )}
            </div>
          )}
          {isTest && (
            <div className={styles.countDownContainer}>
              <div className={styles.countDownWrapper}>
                <h1>{seconds}</h1>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.completeNoti}>
            {!isTest ? (
              <h2>Finished!</h2>
            ) : (
              <div className={styles.resultContainer}>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          label: "My First Dataset",
                          data: [scores, number - scores],
                          backgroundColor: ["#4bcf72", "#dce2ee"],
                          hoverOffset: 4,
                        },
                      ],
                    }}
                    options={{
                      cutout: "80%",
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        tooltip: {
                          enabled: false,
                        },
                      },
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#4bcf72",
                    }}
                  >
                    {(scores * 100) / number}%
                  </div>
                </div>
                <div className={styles.resultDetail}>
                  <div>
                    <p>
                      Total: <span className={styles.total}>{number}</span>
                    </p>
                  </div>
                  <div className={styles.detailContainer}>
                    <p>
                      Correct: <span className={styles.correct}>{scores}</span>
                    </p>
                    <p>
                      Wrong:{" "}
                      <span className={styles.wrong}>{number - scores}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.buttonNotiWrapper}>
            <div
              onClick={() => {
                setPage(0);
                setScores(0);
              }}
              className={styles.button}
            >
              <FontAwesomeIcon icon={faRotateLeft} /> Reset
            </div>
            {unit && (
              <div onClick={handleIncreaseUnit} className={styles.button}>
                Continue
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            )}
          </div>
        </div>
      )}

      {!isDone && (
        <div className={styles.buttonWrapper}>
          {page > 0 && !isTest ? (
            <ArrowCircleLeftOutlinedIcon
              onClick={decreasePage}
              style={{ cursor: "pointer" }}
              fontSize="large"
            />
          ) : (
            <ArrowCircleLeftOutlinedIcon
              style={{ color: "#888" }}
              fontSize="large"
            />
          )}
          <div>
            {page + 1} / {number}
          </div>
          {page < number && !isTest ? (
            <ArrowCircleRightOutlinedIcon
              onClick={increasePage}
              style={{ cursor: "pointer" }}
              fontSize="large"
            />
          ) : (
            <ArrowCircleRightOutlinedIcon
              style={{ color: "#888" }}
              fontSize="large"
            />
          )}
        </div>
      )}
      {!isReading ? (
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter word"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      ) : (
        <div className={styles.recordContainer}>
          <h1 className={`${isCorrect && styles.correctInput}`}>
            {transcript}
          </h1>
          <div className={styles.recordBtn} onClick={handleRecord}>
            {listening ? (
              <StopIcon fontSize="large" />
            ) : (
              <KeyboardVoiceIcon fontSize="large" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Vocabulary;
