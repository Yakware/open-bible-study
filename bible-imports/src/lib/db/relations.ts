import { relations } from "drizzle-orm/relations";
import { versions, books, chapters, verses } from "./schema";

export const booksRelations = relations(books, ({one, many}) => ({
	version: one(versions, {
		fields: [books.versionId],
		references: [versions.id]
	}),
	chapters: many(chapters),
}));

export const versionsRelations = relations(versions, ({many}) => ({
	books: many(books),
}));

export const chaptersRelations = relations(chapters, ({one, many}) => ({
	book: one(books, {
		fields: [chapters.bookId],
		references: [books.id]
	}),
	verses: many(verses),
}));

export const versesRelations = relations(verses, ({one}) => ({
	chapter: one(chapters, {
		fields: [verses.chapterId],
		references: [chapters.id]
	}),
}));