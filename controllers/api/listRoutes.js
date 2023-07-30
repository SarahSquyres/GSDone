//routes for to do list

const express = require('express');
const router = express.Router();
const { List } = require('../../models');
const withAuth = require('../../utils/auth');

//get all lists