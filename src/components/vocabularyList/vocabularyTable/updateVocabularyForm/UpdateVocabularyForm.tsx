"use client";
import { useVocabulary, useVocabularyById } from "@/customHooks/CustomHooks";
import { types } from "@/libs/data";
import React, { useEffect, useState } from "react";
import UpdateUnit from "./updateUnit/UpdateUnit";
import styles from "./updateVocabularyForm.module.css";
import { updateVocabulary } from "@/libs/actions";
import UpdateUpload from "./updateUpload/UpdateUpload";

const UpdateVocabularyForm = ({
  unitId,
  vocabularyId,
  onClose,
}: {
  vocabularyId: string;
  onClose: any;
  unitId: any;
}) => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [transcription, setTranscription] = useState("");
  const [wordType, setWordType] = useState("");
  const [files, setFiles] = useState<
    { key: string; url: string; name: string }[]
  >([]);
  const [audioLink, setAudioLink] = useState("");
  const { vocabulary, isLoadingVocabulary, isErrorVocabulary } =
    useVocabularyById(vocabularyId);
  const { nutateVocabularies } = useVocabulary(unitId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWord(vocabulary?.word);
    setDefinition(vocabulary?.definition);
    setTranscription(vocabulary?.transcription);
    setWordType(vocabulary?.wordType);
    setAudioLink(vocabulary?.audioLink);
  }, [
    vocabulary?.word,
    vocabulary?.definition,
    vocabulary?.transcription,
    vocabulary?.wordType,
    vocabulary?.audioLink,
  ]);

  if (isErrorVocabulary) return <div>failed to load</div>;
  if (isLoadingVocabulary) return <div>loading...</div>;

  return (
    <form
      className={styles.form}
      action={async (formData) => {
        setIsLoading(true);
        await updateVocabulary(formData);
        nutateVocabularies();
        onClose();
        setFiles([]);
        setIsLoading(false);
      }}
    >
      <input type="hidden" value={vocabulary?._id} name="id" />
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        name="word"
        disabled={isLoading}
      />
      <input
        type="text"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        name="definition"
        disabled={isLoading}
      />
      <input
        type="text"
        value={transcription}
        onChange={(e) => setTranscription(e.target.value)}
        name="transcription"
        disabled={isLoading}
      />
      <select
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
      <UpdateUpload files={files} setFiles={setFiles} audioLink={audioLink} />
      <UpdateUnit isLoading={isLoading} unitId={vocabulary?.unitId} />
      <div className={styles.updateButtonWrapper}>
        <button disabled={isLoading}>Update</button>
      </div>
    </form>
  );
};

export default UpdateVocabularyForm;
