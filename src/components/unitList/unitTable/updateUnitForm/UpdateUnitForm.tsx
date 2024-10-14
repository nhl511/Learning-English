import { useUnit, useUnitById } from "@/customHooks/CustomHooks";
import React, { useEffect, useState } from "react";
import styles from "./updateUnitForm.module.css";
import { updateUnit } from "@/libs/actions";

const UpdateUnitForm = ({
  unitId,
  gradeId,
  onClose,
}: {
  unitId: string;
  gradeId: string;
  onClose: any;
}) => {
  const { unit } = useUnitById(unitId);
  const { mutateUnits } = useUnit(gradeId);

  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDescription(unit?.description);
  }, [unit?.description]);
  return (
    <div>
      <h2>Update unit</h2>
      <form
        className={styles.form}
        action={async (formData) => {
          setIsLoading(true);
          await updateUnit(formData);
          mutateUnits();
          onClose();
          setIsLoading(false);
        }}
      >
        <input type="hidden" value={unit?._id} name="unitId" />
        <input
          name="description"
          placeholder="Enter description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.updateButtonWrapper}>
          <button disabled={isLoading}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUnitForm;
