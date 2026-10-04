import { skillsApi } from "@/api/skillsApi";
import { useFetch } from "./useFetch";

export const useSkills = () => useFetch(() => skillsApi.list(), []);