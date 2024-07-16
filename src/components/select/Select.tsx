import React, { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { GradeType } from "@/types/types";
import { updateGradeForUser } from "@/libs/actions";

const Select = ({
  grades,
  setGradeId,
  title,
}: {
  grades: GradeType[];
  isLoadingGrades: boolean;
  setGradeId: any;
  title: any;
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  let menuRef = useRef<any>();

  useEffect(() => {
    if (title !== "") {
      setInput(title);
    }
  }, [title]);

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className={styles.container}>
      <div className={styles.menuContainer} ref={menuRef}>
        <div
          className={styles.group}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
          <input
            type="text"
            placeholder="Select your grade"
            className={styles.input}
            value={input}
          />
        </div>
        <div
          className={`${styles.dropdownMenu} ${
            open ? styles.active : styles.inactive
          }`}
        >
          <ul>
            {grades?.map((grade) => (
              <li
                key={grade._id}
                className={`${styles.dropdownItem} ${
                  grade?.title === title && styles.chosed
                }`}
                onClick={async () => {
                  await updateGradeForUser(grade._id);
                  setGradeId(grade._id);
                  setInput(grade.title);
                  setOpen(false);
                }}
              >
                <p>{grade.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
