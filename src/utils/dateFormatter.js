import dayjs from "dayjs";

export const formatDateTime = (dateStr) => {
  return dayjs(dateStr).format("YYYY-MM-DD HH:mm");
};

export const formatDate = (dateStr) => {
  return dayjs(dateStr).format("YYYY-MM-DD");
};

export const formatTime = (dateStr) => {
  return dayjs(dateStr).format("HH:mm");
};
