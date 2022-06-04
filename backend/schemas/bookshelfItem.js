import { FaBook } from "react-icons/fa";

export default {
  name: "bookshelfItem",
  title: "Bookshelf Item",
  type: "document",
  icon: FaBook,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Title or name of the piece",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Author of piece.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publisher",
      title: "Publisher",
      type: "string",
      description: "Publisher of piece.",
    },
    {
      name: "year",
      title: "Year",
      type: "date",
      description: "Year piece was published.",
      options: {
        dateFormat: "YYYY",
        calendarTodayLabel: "Today",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Description or explanation of piece.",
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "place" }],
      description: "Location that piece references.",
    },
  ],
};
