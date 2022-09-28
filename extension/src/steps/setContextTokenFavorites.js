'use strict'

/**
 * This is a placeholder.
 * The pipeline, which calls this function will be overwritten by the "favorites" extension if it is deployed correctly.
 * @param {ApiteSW6Utility.PipelineContext} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => context.log.debug('If favorites is installed, you should not be seeing this')
