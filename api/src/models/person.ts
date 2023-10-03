import pool from "../utils/database";
const create: any = async (
  rut: string,
  name: string,
  paternallastname: string,
  maternallastname: string,
  email: string,
  phone: string
) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.persona (rut, "name", paternallastname, maternallastname, email, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (rut) DO UPDATE
      SET "name" = EXCLUDED."name",
          paternallastname = EXCLUDED.paternallastname,
          maternallastname = EXCLUDED.maternallastname,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone RETURNING *;`,
      [rut, name, paternallastname, maternallastname, email, phone]
    );
    return {
      success: true,
      data: result.rows[0] || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `SELECT id, rut, "name", paternallastname, maternallastname, email, phone
      FROM app.persona WHERE rut = $1;
      `,
      [rut]
    );
    return {
      success: true,
      data: result.rows[0] || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByEmail: any = async (email: string) => {
  try {
    const result = await pool.query(
      `SELECT id, rut, "name", paternallastname, maternallastname, email, phone
      FROM app.persona WHERE email = $1; `,
      [email]
    );
    return {
      success: true,
      data: result.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (person_id: string) => {
  try {
    const result = await pool.query(
      `SELECT id, rut, "name", paternallastname, maternallastname, email, phone
      FROM app.persona WHERE id = $1; `,
      [person_id]
    );
    return {
      success: true,
      data: result.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};
export { create, getByRut, getByEmail, getById };
