// OBJECT DEFINITIONS

/**
 * @swagger
 *
 * definitions:
 *   Ride:
 *     type: object
 *     required:
 *       - rideID
 *       - startLat
 *       - startLong
 *       - endLat
 *       - endLong
 *       - riderName
 *       - driverName
 *       - driverVehicle
 *     properties:
 *       rideID:
 *         type: integer
 *         format: int64
 *       startLat:
 *         type: integer
 *         format: int64
 *       startLong:
 *         type: integer
 *         format: int64
 *       endLat:
 *         type: integer
 *         format: int64
 *       endLong:
 *         type: integer
 *         format: int64
 *       riderName:
 *         type: string
 *       driverName:
 *         type: string
 *       driverVehicle:
 *         type: string
 *       created:
 *         type: string
 */

/**
 * @swagger
 *
 * definitions:
 *   CreateRidePayload:
 *     type: object
 *     required:
 *       - startLat
 *       - startLong
 *       - endLat
 *       - endLong
 *       - riderName
 *       - driverName
 *       - driverVehicle
 *     properties:
 *       startLat:
 *         type: integer
 *         format: int64
 *       startLong:
 *         type: integer
 *         format: int64
 *       endLat:
 *         type: integer
 *         format: int64
 *       endLong:
 *         type: integer
 *         format: int64
 *       riderName:
 *         type: string
 *       driverName:
 *         type: string
 *       driverVehicle:
 *         type: string
 */

// API DEFINITIONS

/**
 * @swagger
 *
 * /rides:
 *   get:
 *     tags:
 *       - "rides"
 *     description: Show all active rides
 *     parameters:
 *        - in: query
 *          name: page
 *          type: integer
 *          required: false
 *          description: page number
 *        - in: query
 *          name: limit
 *          type: integer
 *          required: false
 *          description: number of data per page
 *     responses:
 *       200:
 *         description: Return all active rides
 *         content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:
 *              $ref: '#/definitions/Ride'
 *       500:
 *         description: Problem Detected
 */

/**
 * @swagger
 *
 * /rides:
 *   post:
 *     tags:
 *       - "rides"
 *     description: Create a new ride
 *     requestBody:
 *       content:
 *         "application/json":
 *           schema:
 *            $ref: "#/definitions/CreateRidePayload"
 *     responses:
 *       200:
 *         description: Return ride
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Ride'
 *       500:
 *         description: Problem Detected
 */

/**
 * @swagger
 *
 * /rides/{id}:
 *   get:
 *     tags:
 *       - "rides"
 *     description: Get ride based on ride ID
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "Ride ID"
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return current ride
 *         content:
 *           application/json:
 *              schema:   
 *                type: array
 *                items:
 *                  $ref: '#/definitions/Ride'
 *       500:
 *         description: Problem Detected
 */
