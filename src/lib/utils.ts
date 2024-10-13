import { PayloadClientSettings } from "@/types";

export const createQuery = (
  query?: { [key: string]: any },
  settings?: PayloadClientSettings
) => {
  const q = query || {};
  if (!settings) return q;

  const { locale, fallbackLocale, defaultDepth } = settings;

  return {
    locale,
    fallbackLocale,
    depth: defaultDepth,
    ...query,
  };
};
