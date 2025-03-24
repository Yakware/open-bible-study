import { InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Users
 */
export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: text().notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    username: text().notNull(),
    externalUserId: text("external_user_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("users_external_user_id_idx").on(table.externalUserId),
    uniqueIndex("users_email_idx").on(table.email),
  ]
);

/**
 * Versions
 */
export const versions = pgTable("versions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
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
    versionId: integer("version_id")
      .notNull()
      .references(() => versions.id, { onDelete: "cascade" }),
    name: text().notNull(),
    abbreviation: text().notNull(),
    position: integer().notNull(),
    testament: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("books_version_id_idx").on(table.versionId),
    uniqueIndex("books_version_name_idx").on(table.versionId, table.name),
  ]
);

export const booksRelations = relations(books, ({ one, many }) => ({
  version: one(versions, {
    fields: [books.versionId],
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
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    number: text().notNull(),
    position: integer().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("chapters_book_id_idx").on(table.bookId),
    uniqueIndex("chapters_book_number_idx").on(table.bookId, table.number),
  ]
);

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  book: one(books, {
    fields: [chapters.bookId],
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
    chapterId: integer("chapter_id")
      .notNull()
      .references(() => chapters.id, { onDelete: "cascade" }),
    number: integer().notNull(),
    text: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("verses_chapter_id_idx").on(table.chapterId),
    uniqueIndex("verses_chapter_number_idx").on(table.chapterId, table.number),
  ]
);

export const versesRelations = relations(verses, ({ one }) => ({
  chapter: one(chapters, {
    fields: [verses.chapterId],
    references: [chapters.id],
  }),
}));

export type Verse = InferSelectModel<typeof verses> & {
  chapter: InferSelectModel<typeof chapters>;
  version: InferSelectModel<typeof versions>;
  book: InferSelectModel<typeof books>;
};

/**
 * Notes
 */
export const notes = pgTable(
  "notes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    verseId: integer("verse_id")
      .notNull()
      .references(() => verses.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    text: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("notes_verse_id_idx").on(table.verseId),
    index("notes_user_id_idx").on(table.userId),
  ]
);
