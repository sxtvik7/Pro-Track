import { boolean, integer, jsonb, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Trainers
export const trainers = pgTable('trainers', {
    id: uuid().primaryKey().defaultRandom(),
    auth_user_id: varchar('auth_user_id', {length: 255}).notNull(),
    name: varchar('name', {length: 200}).notNull(),
    email: varchar('email', {length: 200}).notNull(),
    phone: varchar('phone', {length: 50}),
    bio: text('bio'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
})

// Clients (for future)
export const clients = pgTable('clients', {
    id: uuid().primaryKey().defaultRandom(),
    trainer_id: uuid('trainers_id').references(()=> trainers.id).notNull(),
    name: varchar("name", {length: 200}).notNull(),
    email: varchar("email", {length: 200}),
    phone: varchar('phone', {length: 50}),
    dob: timestamp('dob'),
    sex: varchar('sex', {length: 20}),
    address: text("address"),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    deleted_at: timestamp('deleted_at'),
})

// for Future Clinet login
export const clinet_user_accounts = pgTable("client_user_account", {
    id: serial('id').primaryKey(),
    clinet_id: integer("client_id").references(()=> clients.id).notNull(),
    auth_user_id: varchar("auth_user_id", {length: 255}).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

// onBoarding
export const client_onboarding = pgTable("client_onboarding", {
  id: serial("id").primaryKey(),

  client_id: integer("client_id")
    .references(() => clients.id)
    .notNull(),

  activity_level: varchar("activity_level", { length: 50 }),
  exercise_history: text("exercise_history"),
  dietary_habits: text("dietary_habits"),
  sleep_hours: integer("sleep_hours"),
  stress_level: varchar("stress_level", { length: 50 }),

  allergies_encrypted: text("allergies_encrypted"),
  medications_encrypted: text("medications_encrypted"),
  past_surgeries: text("past_surgeries"),
  family_history: text("family_history"),

  doctor_clearance_required: boolean("doctor_clearance_required").default(false),

  primary_goal: varchar("primary_goal", { length: 200 }),
  short_term_goal: text("short_term_goal"),
  long_term_goal: text("long_term_goal"),

  consent_signed_at: timestamp("consent_signed_at"),
  consent_version: varchar("consent_version", { length: 50 }),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

// fitness test
export const fitness_tests = pgTable('fitness_test', {
    id: serial('id').primaryKey(),
    client_id: integer('client_id').references(()=>trainers.id).notNull(),
    test_date: timestamp("test_date").defaultNow().notNull(),
    test_type: varchar("test_type", { length: 80 }).default("baseline"),
    notes: text("notes"),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

export const progress_snapshots = pgTable("progress_snapshots", {
    id: serial('id').primaryKey(),
    client_id: integer('client_id').references(() => clients.id).notNull(),
    trainer_id: uuid("trainer_id").references(() => trainers.id).notNull(),
    period_start: timestamp("period_start").notNull(),
    period_end: timestamp('period_end').notNull(),
    snapshot_data: jsonb('snapshot_data').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})

// Certificate
export const trainer_certificates = pgTable("trainer_certificates", {
  id: serial("id").primaryKey(),

  trainer_id: uuid("trainer_id")
    .references(() => trainers.id)
    .notNull(),

  file_path: varchar("file_path", { length: 512 }).notNull(),
  file_meta: jsonb("file_meta"),
  verified: boolean("verified").default(false),

  uploaded_at: timestamp("uploaded_at").defaultNow().notNull(),
});

export const qr_tokens = pgTable("qr_tokens", {
  id: serial("id").primaryKey(),

  trainer_id: uuid("trainer_id")
    .references(() => trainers.id)
    .notNull(),

  token: varchar("token", { length: 200 }).notNull(),
  expires_at: timestamp("expires_at").notNull(),
  used: boolean("used").default(false),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const audit_logs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),

  actor_id: varchar("actor_id", { length: 255 }),
  action: varchar("action", { length: 200 }).notNull(),
  resource: varchar("resource", { length: 200 }),
  resource_id: varchar("resource_id", { length: 200 }),
  metadata: jsonb("metadata"),

  created_at: timestamp("created_at").defaultNow().notNull(),
});