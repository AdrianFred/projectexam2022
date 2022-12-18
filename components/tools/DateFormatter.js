export default function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    dateStyle: "medium",
  });
  return formattedDate;
}

export function formatTimeLeft(date) {
  const currentDate = new Date();
  const endDate = new Date(date);
  const timeLeft = endDate - currentDate;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  // const seconds = Math.floor((timeLeft / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m`;
}

export function convertDate(date) {
  const newDate = new Date(date);
  const isoDate = newDate.toISOString();
  return isoDate;
}

export function convertDateToHours(date) {
  const currentDate = new Date();
  const newDate = new Date(date);
  const timeSince = currentDate - newDate;
  const hours = Math.floor(timeSince / (1000 * 60 * 60));
  const minutes = Math.floor((timeSince / 1000 / 60) % 60);
  return `${hours}h ${minutes}m`;
}
