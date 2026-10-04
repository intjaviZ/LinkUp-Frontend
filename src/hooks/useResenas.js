import { resenasApi } from "@/api/resenasApi";
import { useFetch } from "./useFetch";

export const useResenas = (params) =>
  useFetch(async () => (await resenasApi.list(params)).results, [JSON.stringify(params)]);