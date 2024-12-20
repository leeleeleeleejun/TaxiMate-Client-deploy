const formatDateForChatMessage = (targetDate: string) => {
  return new Date(new Date(targetDate).getTime() + 1000 * 60 * 60 * 9)
    .toISOString()
    .slice(11, 16);
};
export default formatDateForChatMessage;
