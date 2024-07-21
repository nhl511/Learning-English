import useSWR from "swr";

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
