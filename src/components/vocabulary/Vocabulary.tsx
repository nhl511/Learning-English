"use client";
import styles from "./vocabulary.module.css";
import React, { useEffect, useState } from "react";
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

  const decreasePage = () => {
    setPage((prev: any) => prev - 1);
    setInputValue("");
  };

  const increasePage = () => {
    setPage((prev: any) => prev + 1);
    setInputValue("");
  };

  useEffect(() => {
    if (inputValue.toUpperCase() === data?.word?.toUpperCase()) {
      increasePage();
    }
  }, [inputValue]);

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
          <div className={styles.backWrapper}>
            <div className={styles.back} onClick={() => router.push("/")}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className={styles.optionWrapper}>
          <div className={styles.option} onClick={handleOpenModal}>
            Option
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
              <AudioPlayer link={data?.audioLink} autoPlay={true} />
            </div>
          </div>
          <div className={styles.actionButtonWrapper}>
            {isReviewing ? (
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
            )}
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

      <input
        type="text"
        className={styles.input}
        placeholder="Enter word"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
};

export default Vocabulary;
