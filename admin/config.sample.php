<?php
/**
 * TAMCU admin settings.
 *
 * SETUP_KEY is needed only once: the first time someone opens /admin/ they must enter it to
 * create the admin password. After that it is not used. Change it if it has been shared widely.
 */
const SETUP_KEY = 'CHANGE-ME-BEFORE-UPLOAD';

/** Largest upload accepted, in megabytes. */
const MAX_UPLOAD_MB = 10;

/** Long side of uploaded photos after resizing, in pixels (when the server has GD). */
const MAX_IMAGE_PX = 1600;
