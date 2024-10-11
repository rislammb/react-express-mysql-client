import { format } from "date-fns";

export const formatDate = (date) => format(date, "HH:mm:ss, dd MMM, yyyy");
