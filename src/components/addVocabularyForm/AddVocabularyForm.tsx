"use client";
import React, { useState } from "react";
import styles from "./addVocabularyForm.module.css";
import { types } from "@/libs/data";
import { GradeType, UnitType } from "@/types/types";
import { addVocabulary } from "@/libs/actions";
import { useGrade, useUnit, useVocabulary } from "@/customHooks/CustomHooks";

const AddVocabularyForm = () => {
  const [unitId, setUnitId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [transcription, setTranscription] = useState("");
  const [wordType, setWordType] = useState("");

  const { grades } = useGrade();
  const { units } = useUnit(gradeId);
  const { nutateVocabularies } = useVocabulary(unitId);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async (formData: any) => {
        setIsLoading(true);
        await addVocabulary(formData);
        nutateVocabularies();
        setWord("");
        setDefinition("");
        setTranscription("");
        setWordType("");
        setIsLoading(false);
      }}
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Enter word"
        name="word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="Enter definition"
        name="definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="text"
        placeholder="Enter transcription"
        name="transcription"
        value={transcription}
        onChange={(e) => setTranscription(e.target.value)}
        disabled={isLoading}
      />
      <select
        defaultValue=""
        name="wordType"
        value={wordType}
        onChange={(e) => setWordType(e.target.value)}
        disabled={isLoading}
      >
        <option value="" disabled>
          Select a word type
        </option>
        {types.map((type) => (
          <option key="">{type}</option>
        ))}
      </select>

      <select
        onChange={(e: any) => {
          setGradeId(e.target.value);
          setUnitId("");
        }}
        defaultValue=""
        value={gradeId}
        disabled={isLoading}
      >
        <option value="" disabled>
          Select a grade
        </option>
        {grades?.map((grade: GradeType) => (
          <option key={grade._id} value={grade._id}>
            {grade.title}
          </option>
        ))}
      </select>
      <select
        defaultValue=""
        name="unitId"
        value={unitId}
        onChange={(e: any) => setUnitId(e.target.value)}
        disabled={isLoading}
      >
        <option value="" disabled>
          Select a unit
        </option>
        {units?.map((unit: UnitType) => (
          <option key={unit._id} value={unit._id}>
            {unit.title}
          </option>
        ))}
      </select>

      <button disabled={isLoading}>Add</button>
    </form>
  );
};

export default AddVocabularyForm;
