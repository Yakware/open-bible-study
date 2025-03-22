import { pgTable, integer, text, timestamp, index, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const versions = pgTable("versions", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "versions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: text().notNull(),
	abbreviation: text().notNull(),
	language: text(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const books = pgTable("books", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "books_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	versionId: integer("version_id").notNull(),
	name: text().notNull(),
	abbreviation: text().notNull(),
	position: integer().notNull(),
	testament: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("books_version_id_idx").using("btree", table.versionId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.versionId],
			foreignColumns: [versions.id],
			name: "books_version_id_versions_id_fk"
		}).onDelete("cascade"),
]);

export const chapters = pgTable("chapters", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "chapters_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	bookId: integer("book_id").notNull(),
	number: text().notNull(),
	position: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("chapters_book_id_idx").using("btree", table.bookId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.bookId],
			foreignColumns: [books.id],
			name: "chapters_book_id_books_id_fk"
		}).onDelete("cascade"),
]);

export const verses = pgTable("verses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "verses_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	chapterId: integer("chapter_id").notNull(),
	number: integer().notNull(),
	text: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("verses_chapter_id_idx").using("btree", table.chapterId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.chapterId],
			foreignColumns: [chapters.id],
			name: "verses_chapter_id_chapters_id_fk"
		}).onDelete("cascade"),
]);
