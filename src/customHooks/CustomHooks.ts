import useSWR from "swr";
import axios from "axios";

const gradesFetcher = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/grades"
  );
  const data = await res.json();
  return data;
};

export const useGrade = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "api/grades",
    gradesFetcher
  );
  return {
    grades: data,
    isLoadingGrades: isLoading,
    isErrorGrades: error,
    mutateGrades: mutate,
  };
};

const unitsFetcher = async (gradeId: string) => {
  if (gradeId) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/units?gradeId=${gradeId}`
    );
    const data = await res.json();
    return data;
  }
};

export const useUnit = (gradeId: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    `api/units?gradeId=${gradeId}`,
    () => unitsFetcher(gradeId)
  );
  return {
    units: data,
    isLoadingUnits: isLoading,
    isErrorUnits: error,
    mutateUnits: mutate,
  };
};

const vocabulariesFetcher = async (unitId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/vocabularies?unitId=${unitId}`
  );
  const data = await res.json();
  return data;
};

export const useVocabulary = (unitId: string) => {
  const { data, isLoading, error, mutate } = useSWR(
    `api/vocabularies?unitId=${unitId}`,
    () => vocabulariesFetcher(unitId)
  );
  return {
    vocabularies: data,
    isLoadingVocabularies: isLoading,
    isErrorVocabularies: error,
    nutateVocabularies: mutate,
  };
};
const vocabularyFetcher = async (vocabularyId: string) => {
  if (vocabularyId) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
        `/api/vocabularies/${vocabularyId}`
    );
    const data = await res.json();
    return data;
  }
};

export const useVocabularyById = (vocabularyId: string) => {
  const { data, isLoading, error } = useSWR(
    `api/vocabularies/${vocabularyId}`,
    () => vocabularyFetcher(vocabularyId)
  );
  return {
    vocabulary: data,
    isLoadingVocabulary: isLoading,
    isErrorVocabulary: error,
  };
};

const unitFetcher = async (unitId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/units/${unitId}`
  );
  const data = await res.json();
  return data;
};

export const useUnitById = (unitId: string) => {
  const { data, isLoading, error } = useSWR(`api/units/${unitId}`, () =>
    unitFetcher(unitId)
  );
  return {
    unit: data,
    isLoadingUnit: isLoading,
    isErrorUnit: error,
  };
};

const gradeFetcher = async (gradeId: string) => {
  if (gradeId) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/grades/${gradeId}`
    );
    const data = await res.json();
    return data;
  }
};

export const useGradeById = (gradeId: string) => {
  const { data, isLoading, error } = useSWR(`api/grades/${gradeId}`, () =>
    gradeFetcher(gradeId)
  );
  return {
    grade: data,
    isLoadingGrade: isLoading,
    isErrorGrade: error,
  };
};

const numberOfVocabularyFetcher = async (unitId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/get-number-of-vocabulary/${unitId}`
  );
  const data = await res.json();
  return data;
};

export const useNumberOfVocabulary = (unitId: string) => {
  const { data, isLoading } = useSWR(
    `api/get-number-of-vocabulary/${unitId}`,
    () => numberOfVocabularyFetcher(unitId)
  );
  return {
    number: data,
    isLoadingNumber: isLoading,
  };
};

const numberOfHardVocabularyFetcher = async (userId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/get-number-of-hard-vocabulary?userId=${userId}`
  );
  const data = await res.json();
  return data;
};

export const useNumberOfHardVocabulary = (userId: string) => {
  const { data, isLoading } = useSWR(
    `api/get-number-of-hard-vocabulary?userId=${userId}`,
    () => numberOfHardVocabularyFetcher(userId)
  );
  return {
    number: data,
  };
};

const hardVocabularyById = async (vocabularyId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/hard-vocabularies/${vocabularyId}`
  );
  const data = await res.json();
  return data;
};

export const useHardVocabularyById = (vocabularyId: string) => {
  const { data, isLoading, mutate } = useSWR(
    `api/hard-vocabularies/${vocabularyId}`,
    () => hardVocabularyById(vocabularyId)
  );

  return {
    hardVocabularies: data,
    mutateHardVocabularies: mutate,
  };
};

const sessionFetcher = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/auth`
  );
  const data = await res.json();
  return data;
};

export const useSession = () => {
  const { data, isLoading, mutate } = useSWR(`api/auth`, sessionFetcher);
  return {
    sessionData: data,
    isLoadingSession: isLoading,
    mutateSession: mutate,
  };
};

const userInfoFetcher = async (userId: string) => {
  if (userId) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/users/${userId}`
    );
    const data = await res.json();
    return data;
  }
};

export const useUserInfo = (userId: string) => {
  const { data, isLoading } = useSWR(`api/users/${userId}`, () =>
    userInfoFetcher(userId)
  );
  return {
    userInfoData: data,
    isLoadingUserInfoData: isLoading,
  };
};

const hardVocabulariesFetcher = async ({
  page,
  userId,
}: {
  page: number;
  userId: string;
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/hard-vocabularies?page=${page}&userId=${userId}`
  );
  const data = await res.json();
  return data;
};

export const useHardVocabularies = ({
  page,
  userId,
}: {
  page: number;
  userId: string;
}) => {
  const { data, isLoading, mutate } = useSWR(
    `api/hard-vocabularies?page=${page}&userId=${userId}`,
    () => hardVocabulariesFetcher({ page, userId })
  );
  const { vocabulary, isLoadingVocabulary } = useVocabularyById(
    data?.vocabularyId
  );

  return {
    hardVocabularyData: vocabulary,
    isLoadingHardVocabulary: isLoadingVocabulary,
  };
};

const correctTimeFetcher = async ({
  vocabId,
  userId,
}: {
  vocabId: string;
  userId: string;
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/correct-time?vocabId=${vocabId}&userId=${userId}`
  );
  const data = await res.json();
  return data;
};

export const useCorrectTime = ({
  vocabId,
  userId,
}: {
  vocabId: string;
  userId: string;
}) => {
  const { data } = useSWR(
    `api/correct-time?vocabId=${vocabId}&userId=${userId}`,
    () => correctTimeFetcher({ vocabId, userId })
  );
  return {
    correctTimeData: data,
  };
};

const learnedVocabularyFetcher = async ({
  userId,
  unitId,
  type,
}: {
  userId: string;
  unitId: string;
  type: string;
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/get-learned-vocabulary?userId=${userId}&unitId=${unitId}&type=${type}`
  );
  const data = await res.json();
  return data;
};

export const useLearnedVocab = ({
  userId,
  unitId,
  type,
}: {
  userId: string;
  unitId: string;
  type: string;
}) => {
  const { data } = useSWR(
    `api/get-learned-vocabulary?userId=${userId}&unitId=${unitId}&type=${type}`,
    () => learnedVocabularyFetcher({ userId, unitId, type })
  );
  return {
    learnedVocabularyData: data,
  };
};

const ttsFetcher = async ({
  text,
  languageCode,
  name,
}: {
  text: string;
  languageCode: string;
  name: string;
}) => {
  const endpoint =
    "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" +
    process.env.NEXT_PUBLIC_TEXT_TO_SPEECH_API_KEY;
  const payload = {
    audioConfig: {
      audioEncoding: "MP3",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1,
    },
    input: {
      text: text,
    },
    voice: {
      languageCode: languageCode,
      name: name,
    },
  };

  try {
    const res = await axios.post(endpoint, payload);
    return `data:audio/mp3;base64,${res.data.audioContent}`;
  } catch (error) {
    console.error("Error during text-to-speech fetch:", error);
    throw error; // re-throw error for caller to handle
  }
};

export const useTTS = ({
  text,
  languageCode,
  name,
}: {
  text: string;
  languageCode: string;
  name: string;
}) => {
  const { data, isLoading, error } = useSWR(`text=${text}`, () =>
    ttsFetcher({ text, languageCode, name })
  );
  return {
    speech: data,
    isLoadingSpeech: isLoading,
    errorSpeech: error,
  };
};

const usersFetcher = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/users"
  );
  const data = await res.json();
  return data;
};

export const useUsers = () => {
  const { data, isLoading, mutate } = useSWR(`api/users`, usersFetcher);
  return {
    usersData: data,
    isLoadingUsersData: isLoading,
    mutateUsers: mutate,
  };
};

const pricesFetcher = async (isActive?: boolean) => {
  if (isActive) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
        `/api/get-prices?isActive=${isActive}`
    );
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/get-prices`
    );
    const data = await res.json();
    return data;
  }
};

export const usePrices = (isActive?: boolean) => {
  const { data, isLoading, mutate } = useSWR(
    `api/get-prices?isActive=${isActive}`,
    () => pricesFetcher(isActive)
  );
  return {
    prices: data,
    isLoadingPrices: isLoading,
    mutatePrices: mutate,
  };
};

const priceFetcher = async (id: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/get-prices/${id}`
  );
  const data = await res.json();
  return data;
};

export const usePriceById = (id: string) => {
  const { data } = useSWR(`api/get-prices/${id}`, () => priceFetcher(id));
  return {
    price: data,
  };
};

const activeRequestFetcher = async (id: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
      `/api/get-active-request?userId=${id}`
  );
  const data = await res.json();
  return data;
};

export const useActiveRequest = (id: string) => {
  const { data, mutate } = useSWR(`api/get-active-request?userId=${id}`, () =>
    activeRequestFetcher(id)
  );
  return {
    request: data,
    mutateRequest: mutate,
  };
};

const activeRequestsFetcher = async (status?: string) => {
  if (status) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
        `/api/get-active-requests?status=${status}`
    );
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/api/get-active-requests`
    );
    const data = await res.json();
    return data;
  }
};

export const useActiveRequests = (status?: string) => {
  const { data, mutate } = useSWR(
    `api/get-active-requests?status=${status}`,
    () => activeRequestsFetcher(status)
  );
  return {
    requests: data,
    mutateRequests: mutate,
  };
};
