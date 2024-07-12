const tagService = require('../services/tagService');

const getAllTags = async (req, res, next) => {
    try {
        const tags = await tagService.getAllTags();
        res.json(tags);
    } catch (error) {
        next(error);
    }
};

const getTagById = async (req, res, next) => {
    try {
        const tag = await tagService.getTagById(req.params.id);
        if (!tag) {
            res.status(404).json({ message: 'Tag not found' });
        } else {
            res.json(tag);
        }
    } catch (error) {
        next(error);
    }
};

const createTag = async (req, res, next) => {
    try {
        const tag = await tagService.createTag(req.body);
        res.status(201).json(tag);
    } catch (error) {
        next(error);
    }
};

const updateTag = async (req, res, next) => {
    try {
        const tag = await tagService.updateTag(req.params.id, req.body);
        res.json(tag);
    } catch (error) {
        next(error);
    }
};

const deleteTag = async (req, res, next) => {
    try {
        await tagService.deleteTag(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
};