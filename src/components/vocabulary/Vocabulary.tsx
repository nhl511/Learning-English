"use client";
import "regenerator-runtime/runtime";
import styles from "./vocabulary.module.css";
import React, { useEffect, useRef, useState } from "react";
import { UnitType } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faLightbulb,
  faRotateLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useHardVocabularyById, useSession } from "@/customHooks/CustomHooks";
import { far } from "@fortawesome/free-regular-svg-icons";
import { addHardVocabulary, deleteHardVocabulary } from "@/libs/actions";
import AudioPlayer from "../audioPlayer/AudioPlayer";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import StopIcon from "@mui/icons-material/Stop";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { hardVocabularies, mutateHardVocabularies } = useHardVocabularyById(
    data?._id
  );
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { sessionData } = useSession();
  const [gradeInput, setGradeInput] = useState("");
  const [curInput, setCurInput] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState<any>({});
  const [isReading, setIsReading] = useState(false);
  let menuRef = useRef<any>();
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
      SpeechRecognition.startListening({ continuous: false });
    }
  };
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const categoryLinks = [
    {
      title: "Writing vocabularies",
      icon: <BorderColorIcon />,
    },
    {
      title: "Reading vocabularies",
      icon: <RecordVoiceOverIcon />,
    },
  ];

  useEffect(() => {
    if (!isReading) {
      setCategoryTitle({
        title: "Writing vocabularies",
        icon: <BorderColorIcon />,
      });
    } else {
      setCategoryTitle({
        title: "Reading vocabularies",
        icon: <RecordVoiceOverIcon />,
      });
    }
  }, [isReading]);

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const decreasePage = () => {
    setPage((prev: any) => prev - 1);
    setInputValue("");
    resetTranscript();
  };

  const increasePage = () => {
    setPage((prev: any) => prev + 1);
    setInputValue("");
    resetTranscript();
  };

  useEffect(() => {
    if (!isReading) {
      setPage(0);
      setIsViSound(false);
    } else {
      setPage(0);
      setIsViSound(true);
    }
  }, [isReading]);

  useEffect(() => {
    if (inputValue.toUpperCase() === data?.word?.toUpperCase()) {
      increasePage();
    }
  }, [inputValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (transcript.toUpperCase() === data?.word?.toUpperCase()) {
        increasePage();
      }
    }, 1000);

    return () => clearTimeout(timeout);
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
      if (res._id) router.push("/" + res._id);
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

  if (number === 0) return <div className={styles.empty}></div>;

  return (
    <>
      <div className={styles.header}>
        {unit ? (
          <div className={styles.categoryContainer} ref={menuRef}>
            <div
              className={styles.categoryWrapper}
              onClick={() => setOpen(!open)}
            >
              {categoryTitle.icon}
              {categoryTitle.title}
              <KeyboardArrowDownIcon />
            </div>
            <div
              className={`${styles.categoryMenu} ${
                open ? styles.active : styles.inactive
              }`}
            >
              <ul>
                {categoryLinks.map(
                  (categoryLink) =>
                    categoryLink.title !== categoryTitle.title && (
                      <li
                        key={categoryLink.title}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setOpen(false);
                          setCategoryTitle(categoryLink.title);
                          setIsReading(!isReading);
                        }}
                      >
                        {categoryLink.icon}
                        <p>{categoryLink.title}</p>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className={styles.optionWrapper}>
          {!isReading && (
            <div className={styles.option} onClick={handleOpenModal}>
              Option
            </div>
          )}

          <div
            className={`${styles.option} ${styles.close}`}
            onClick={() => router.push("/")}
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
                <AudioPlayer link={data?.audioLink} autoPlay={true} />
              ) : (
                <AudioPlayer link={data?.viAudioLink} autoPlay={true} />
              )}
            </div>
          </div>
          <div className={styles.actionButtonWrapper}>
            {!isReading ? (
              isReviewing ? (
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
              )
            ) : null}
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.completeNoti}>
            <h2>Finished!</h2>
          </div>
          <div className={styles.buttonNotiWrapper}>
            <div
              onClick={() => {
                setPage(0);
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
          {page > 0 ? (
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
          {page < number ? (
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
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            value={transcript}
            readOnly
          />
          <div className={styles.recordBtn} onClick={handleRecord}>
            {listening ? <StopIcon /> : <KeyboardVoiceIcon />}
          </div>
        </div>
      )}
    </>
  );
};

export default Vocabulary;
