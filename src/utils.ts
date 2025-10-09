import bcrypt from "bcryptjs"

export function normalizaCpf(raw: string){
    const onlyDigits = raw.replace(/\D/g, "");
    if(onlyDigits.length !== 11) throw new Error("Cpf deve conter 11 dígitos")
    return onlyDigits
}

export function normalizaCrm(raw:string){
    const cleanned = raw.replace(/[^\w\/]/g, '');
    const parts = cleanned.split("/");

    if(parts.length !== 2){
        throw new Error("CRM deve conter sigla da UF separada da barra")
    }

    const [numero, uf] = parts

    const onlyDigits = numero.replace(/\D/g, "");
    if(onlyDigits.length !== 6){
        throw new Error("O numero do CRm deve conter 6 digitos")
    }

    const onlyLetters = uf.replace(/[^A-Za-z]/g, "").toUpperCase();
    if(onlyLetters.length !== 2){
        throw new Error("UF deve ter 2 letras")
    }

    return `${onlyDigits}/${onlyLetters}`
}

export async function hashSenha(plain: string){
    const saltRounds = 12;
    const hash = await bcrypt.hash(plain, saltRounds)
    return hash
}

export async function compareSenha(plain: string, hash: string){
    return bcrypt.compare(plain,hash)
}