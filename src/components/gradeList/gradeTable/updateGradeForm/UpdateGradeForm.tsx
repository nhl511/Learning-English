import { useGrade, useGradeById } from "@/customHooks/CustomHooks";
import { updateGrade } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import styles from "./UpdateGradeForm.module.css";

const UpdateGradeForm = ({
  gradeId,
  onClose,
}: {
  gradeId: string;
  onClose: any;
}) => {
  const { grade } = useGradeById(gradeId);
  const { mutateGrades } = useGrade();
  const [title, setTitle] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [curInput, setCurInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(grade?.title);
  }, [grade?.title]);

  useEffect(() => {
    if (title !== "" && title) {
      const [gradePart, curriculumPart] = title?.split(" - ");
      setGradeInput(gradePart);
      setCurInput(curriculumPart);
    }
  }, [title]);

  return (
    <div>
      <h2>Update grade</h2>
      <form
        className={styles.form}
        action={async (formData) => {
          setIsLoading(true);
          await updateGrade(formData);
          mutateGrades();
          onClose();
          setIsLoading(false);
        }}
      >
        <input type="hidden" value={grade?._id} name="id" />
        <input
          placeholder="Enter Grade"
          type="text"
          value={gradeInput}
          onChange={(e) => setGradeInput(e.target.value)}
        />
        <input
          placeholder="Enter Curriculum"
          type="text"
          value={curInput}
          onChange={(e) => setCurInput(e.target.value)}
        />
        <input
          className={styles.disabled}
          name="title"
          type="text"
          value={gradeInput + " - " + curInput}
          readOnly
        />
        <div className={styles.updateButtonWrapper}>
          <button disabled={isLoading}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGradeForm;
