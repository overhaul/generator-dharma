/* jshint node: true */
'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var git = require('simple-git')();


var DharmaGenerator = yeoman.generators.Base.extend({

  init: function() {

    this.pkg = require('../package.json');
    this.on('end', function() {

      if ( ! this.options['skip-install'] ) {

        this.installDependencies();

      }

    });

  },

  askFor: function() {

    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);
    this.log(chalk.magenta('Dharma: a WordPress site generator. ॐ'));

    var prompts = [
      {
        name: 'siteName',
        message: 'What is the name of the site you’re building?',
        default: 'My Site'
      },
      {
        name: 'themeSlug',
        message: 'What is the folder name?',
        default: 'my-theme'
      }
    ];

    this.prompt(prompts, function(props) {

      this.siteName = props.siteName;
      this.themeSlug = props.themeSlug;
      this.wpDirectory = props.wpDirectory;
      this.themeDir = this.themeSlug;
      done();

    }.bind(this));

  },

  app: function() {

    // get this folder name from a user prompt
    this.mkdir(this.themeSlug);

  },

  projectfiles: function() {

    this.log(chalk.blue('Creating project & build config files...'));

    this.template(
      '_package.json',
      'package.json');
    this.template(
      '_gulpfile.js',
      'gulpfile.js');
    this.template(
      '_bower.json',
      'bower.json');

  },

  dotfiles: function() {

    this.template(
      '_bowerrc',
      '.bowerrc');
    this.copy(
      'editorconfig',
      '.editorconfig');
    this.copy(
      'jshintrc',
      '.jshintrc');
    this.copy(
      'jscsrc',
      '.jscsrc');
    this.copy(
      '_phpcs.xml',
      'phpcs.xml');
    this.copy(
      'scss-lint.yml',
      '.scss-lint.yml');
    this.template(
      '_gitignore',
      '.gitignore');
    this.copy(
      'gitattributes',
      '.gitattributes');

    this.log(chalk.blue('...done!'));

  },

  themefiles: function() {

    this.log(chalk.blue('Creating WordPress theme & function files...'));

    this.template(
      'theme/_style.css',
      this.themeDir + '/style.css');
    this.copy(
      'theme/404.php',
      this.themeDir + '/404.php');
    this.copy(
      'theme/archive.php',
      this.themeDir + '/archive.php');
    this.copy(
      'theme/footer.php',
      this.themeDir + '/footer.php');
    this.copy(
      'theme/front-page.php',
      this.themeDir + '/front-page.php');
    this.copy(
      'theme/functions.php',
      this.themeDir + '/functions.php');
    this.copy(
      'theme/header.php',
      this.themeDir + '/header.php');
    this.copy(
      'theme/index.php',
      this.themeDir + '/index.php');
    this.copy(
      'theme/page.php',
      this.themeDir + '/page.php');
    this.copy(
      'theme/search.php',
      this.themeDir + '/search.php');
    this.copy(
      'theme/single.php',
      this.themeDir + '/single.php');
    this.directory(
      'theme/includes/',
      this.themeDir + '/includes/');

    this.log(chalk.blue('...done!'));

  },

  stylefiles: function() {

    this.log(chalk.blue('Creating initial SASS files...'));

    this.template(
      'theme/source/styles/_style.scss',
      this.themeDir + '/source/styles/style.scss');
    this.copy(
      'theme/source/styles/editor-style.scss',
      this.themeDir + '/source/styles/editor-style.scss');
    this.copy(
      'theme/source/styles/login-style.scss',
      this.themeDir + '/source/styles/login-style.scss');
    this.copy(
      'theme/source/styles/variables.scss',
      this.themeDir + '/source/styles/_variables.scss');
    this.copy(
      'theme/source/styles/mixins.scss',
      this.themeDir + '/source/styles/_mixins.scss');
    this.directory(
      'theme/source/styles/partials/',
      this.themeDir + '/source/styles/partials/');

    this.log(chalk.blue('...done!'));

  },

  imagefiles: function() {

    this.log(chalk.blue('Creating site theme image...'));
    this.copy('theme/screenshot.png', this.themeDir + '/screenshot.png');

    this.log(chalk.blue('...done!'));

  },

  gitsome: function() {

    var done = this.async();
    var me = this;

    me.log(chalk.magenta('Initialising git repo...'));

    git.init(function(err) {

      if ( err ) {

        me.log(chalk.red(err));

      }

      done();

    });

    git.add('./*');
    git.commit('Initialised project. ॐ');

    this.log(chalk.magenta('...done! Remember to add an origin and push.'));

  }

});

module.exports = DharmaGenerator;
