const core = require('@actions/core');

async function run() {
  const value = core.getInput('value', { required: true });
  const format = core.getInput('format', { required: true });

  try {
    switch(format){
      case 'docker':
        var formatted = value
          .toLowerCase()
          .replace(/[^a-z]+/g,'-')
          .replace(/[^a-z]+$/g,'')
          .replace(/^[^a-z]+/g,'');
        core.setOutput('formatted', formatted); break;
      default:
        throw 'Unknown format: ' + format;
    }
  }
  catch (error) {
    core.setFailed(error.message || error);
  }
}

module.exports = {
  run
};

/* istanbul ignore next */
if (require.main === module) {
    run();
}
