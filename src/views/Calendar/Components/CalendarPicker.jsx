import React, { useState, useEffect } from "react";

const EnhancedCalendarPicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [animationDirection, setAnimationDirection] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Handle month navigation with animation direction
  const prevMonth = () => {
    setAnimationDirection("left");
    setTimeout(() => {
      setCurrentDate(new Date(year, month - 1, 1));
      setTimeout(() => setAnimationDirection(null), 300);
    }, 100);
  };

  const nextMonth = () => {
    setAnimationDirection("right");
    setTimeout(() => {
      setCurrentDate(new Date(year, month + 1, 1));
      setTimeout(() => setAnimationDirection(null), 300);
    }, 100);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const renderCalendarDays = () => {
    const blanks = [];
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(
        <div
          key={`blank-${i}`}
          className="flex items-center justify-center h-12"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      // Check if this date is a weekend (Saturday or Sunday)
      const date = new Date(year, month, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateSelect(day)}
          className={`
            flex items-center justify-center h-12 relative
            transition-all duration-200 ease-in-out cursor-pointer rounded-full mx-1
            ${
              isSelected
                ? "bg-indigo-600 text-white font-medium transform scale-105 shadow-md"
                : ""
            }
            ${isToday && !isSelected ? "border-2 border-indigo-400" : ""}
            ${
              isWeekend && !isSelected ? "text-indigo-400" : isWeekend ? "" : ""
            }
            ${!isSelected && !isToday ? "hover:bg-indigo-50" : ""}
          `}
        >
          <span
            className={`
            text-sm md:text-base 
            ${isWeekend && !isSelected ? "text-indigo-400" : ""}
          `}
          >
            {day}
          </span>

          {/* Selected indicator dot */}
          {isSelected && (
            <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>
          )}
        </div>
      );
    }

    return [...blanks, ...days];
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return null;

    return {
      weekday: selectedDate.toLocaleDateString("en-US", { weekday: "long" }),
      month: selectedDate.toLocaleDateString("en-US", { month: "long" }),
      day: selectedDate.getDate(),
      year: selectedDate.getFullYear(),
    };
  };

  const formattedDate = formatSelectedDate();

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with current month/year and gradient background */}
      <div className="bg-gradient-to-r from-[#265959] to-green-tint p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">
            {monthNames[month]} {year}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              aria-label="Previous month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              aria-label="Next month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Selected date display */}
        {formattedDate && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="text-4xl font-bold">{formattedDate.day}</div>
            <div className="text-sm font-medium text-indigo-100">
              {formattedDate.weekday}, {formattedDate.month}{" "}
              {formattedDate.year}
            </div>
          </div>
        )}
      </div>

      {/* Calendar body with animations */}
      <div
        className={`p-4 bg-white ${
          animationDirection === "left"
            ? "animate-slide-left"
            : animationDirection === "right"
            ? "animate-slide-right"
            : ""
        }`}
      >
        {/* Day names row */}
        <div className="grid grid-cols-7 mb-2 text-center">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className={`py-2 text-xs font-medium 
                ${
                  index === 0 || index === 6
                    ? "text-indigo-400"
                    : "text-gray-500"
                }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid with subtle divider */}
        <div className="border-t border-gray-100 pt-2">
          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
        </div>
      </div>

      {/* Footer with today button */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <button
          className="w-full py-2 bg-green-tint/10 text-green-tint rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors duration-200"
          onClick={() => {
            const today = new Date();
            setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
            setSelectedDate(today);
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
};

// Add custom animation keyframes using style element
const CalendarPicker = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slide-left {
        0% { transform: translateX(10%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slide-right {
        0% { transform: translateX(-10%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes fade-in {
        0% { opacity: 0; transform: translateY(5px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      .animate-slide-left {
        animation: slide-left 0.3s ease-out forwards;
      }
      
      .animate-slide-right {
        animation: slide-right 0.3s ease-out forwards;
      }
      
      .animate-fade-in {
        animation: fade-in 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <EnhancedCalendarPicker />;
};

export default CalendarPicker;
