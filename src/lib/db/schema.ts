import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

/**
 * Versions
 */
export const versions = pgTable("versions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  abbreviation: text().notNull(),
  language: text(),
  description: text(),
  created_at: timestamp().notNull().defaultNow(),
});

export const versionsRelations = relations(versions, ({ many }) => ({
  books: many(books),
}));

export type Version = InferSelectModel<typeof versions>;

/**
 * Books
 */
export const books = pgTable(
  "books",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    version_id: integer()
      .notNull()
      .references(() => versions.id, { onDelete: "cascade" }),
    name: text().notNull(),
    abbreviation: text().notNull(),
    position: integer().notNull(),
    testament: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [index("books_version_id_idx").on(table.version_id)]
);

export const booksRelations = relations(books, ({ one, many }) => ({
  version: one(versions, {
    fields: [books.version_id],
    references: [versions.id],
  }),
  chapters: many(chapters),
}));

export type Book = InferSelectModel<typeof books>;

/**
 * Chapters
 */
export const chapters = pgTable(
  "chapters",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    book_id: integer()
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    number: text().notNull(),
    position: integer().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [index("chapters_book_id_idx").on(table.book_id)]
);

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  book: one(books, {
    fields: [chapters.book_id],
    references: [books.id],
  }),
  verses: many(verses),
}));

export type Chapter = InferSelectModel<typeof chapters>;

/**
 * Verses
 */
export const verses = pgTable(
  "verses",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    chapter_id: integer()
      .notNull()
      .references(() => chapters.id, { onDelete: "cascade" }),
    number: integer().notNull(),
    text: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [index("verses_chapter_id_idx").on(table.chapter_id)]
);

export const versesRelations = relations(verses, ({ one }) => ({
  chapter: one(chapters, {
    fields: [verses.chapter_id],
    references: [chapters.id],
  }),
}));

export type Verse = InferSelectModel<typeof verses>;
