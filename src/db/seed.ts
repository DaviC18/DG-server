import { db, sql } from "./connections.js";
import { doctor } from "./schema/user-doctor.js";
import { pacient } from "./schema/user-pacient.js";
import { reset, seed } from "drizzle-seed";

async function main() {
	// limpa apenas as duas tabelas que vamos seedar
	await reset(db, { pacient, doctor });

	// roda o seed só em rooms e questions
	await seed(db, { pacient, doctor }).refine((f) => ({
		pacient: {
			count: 5,
			columns: {
				name: f.companyName(),
				cpf: f.number(),
				email: f.email(),
				password: f.string(),
			},
		},
		doctor: {
			count: 5,
			columns: {
				name: f.companyName(),
				cpf: f.number(),
				email: f.email(),
				password: f.string(),
			},
		},
	}));

	await sql.end();
}

main().catch((err) => {
	console.log(err);
	process.exit(1);
});
