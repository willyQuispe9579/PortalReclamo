import pool from "../utils/database";

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT id, typename
      FROM app.typeclaim;
      `
    );
    return {
      success: true,
      data: result.rows || null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const create: any = async (typename: string) => {
  try {
    const result = await pool.query(
      `INSERT INTO app.typeclaim
      ( typename)
      VALUES($1)RETURNING *; `,
      [typename]
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

const update: any = async (id: string, typename: string) => {
  try {
    const result = await pool.query(
      `UPDATE app.typeclaim
      SET typename=$2
      WHERE id=$1  RETURNING *; `,
      [id, typename]
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

const remove: any = async (id: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.typeclaim
      WHERE id=$1;`,
      [id]
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

export { getAll, create, update, remove };
