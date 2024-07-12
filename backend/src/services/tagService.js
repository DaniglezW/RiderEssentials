const pool = require('../config/db');

const getAllTags = async () => {
    const [rows] = await pool.query('SELECT * FROM tags');
    return rows;
};

const getTagById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tags WHERE tag_id = ?', [id]);
    return rows[0];
};

const createTag = async (tag) => {
    const { name } = tag;
    const [result] = await pool.query('INSERT INTO tags (name) VALUES (?)', [name]);
    return { tag_id: result.insertId, ...tag };
};

const updateTag = async (id, tag) => {
    const { name } = tag;
    await pool.query('UPDATE tags SET name = ? WHERE tag_id = ?', [name, id]);
    return getTagById(id);
};

const deleteTag = async (id) => {
    await pool.query('DELETE FROM tags WHERE tag_id = ?', [id]);
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
};