import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import useAppTranslation from "@/hook/useAppTranslation";

type Props = {
  date?: Date;
  setDate: (value: any) => void;
  placeholder?: string;
};

const DatePicker = ({
  date,
  setDate,
  placeholder = "Seleccionar fecha",
}: Props) => {
  const { language } = useAppTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: language === "es" ? es : enUS })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={"single"}
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={language === "es" ? es : enUS}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
