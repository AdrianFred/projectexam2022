export default function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    dateStyle: "medium",
  });
  return formattedDate;
}
