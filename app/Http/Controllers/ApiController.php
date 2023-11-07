<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiController extends Controller
{

    /**
     * @var int
     */
    protected $statusCode = Response::HTTP_OK;

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Respond success
     *
     * @param string $message
     * @param array $data
     * @return mixed
     */
    public function respondSuccess($message = 'Success', $data = [])
    {
        return $this->setStatusCode(Response::HTTP_OK)->respond([
            'success' => [
                'message'     => $message,
                'data'        => $data,
                'status_code' => $this->getStatusCode(),
                'code'        => 1
            ]
        ]);
    }

    /**
     * Respond Unprocessable Entity
     *
     * @param string $message
     * @return mixed
     */
    public function respondUnprocessableEntity($message = 'Unprocessable Entity')
    {
        return $this->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY)->respondWithError($message);
    }

    /**
     * Respond not found
     *
     * @param string $message
     * @return mixed
     */
    public function respondNotFound($message = 'Not Found!')
    {
        return $this->setStatusCode(Response::HTTP_NOT_FOUND)->respondWithError($message);
    }

    /**
     * Respond with internal server error
     * @param string $message
     * @return mixed
     */
    public function respondInternalError($message = 'Internal Error!')
    {
        return $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR)->respondWithError($message);
    }

    /**
     * Respond json
     *
     * @param $data
     * @param array $headers
     * @return mixed
     */
    public function respond($data, $headers = [])
    {
        return response()->json($data, $this->getStatusCode(), $headers);
    }

    /**
     * Respond with error
     *
     * @param $message
     * @param int $code - application code
     * @return mixed
     */
    public function respondWithError($message, $code = 0)
    {
        return $this->respond([
            'error' => [
                'message'     => $message,
                'status_code' => $this->getStatusCode(),
                'code'        => $code
            ]
        ]);
    }

    /**
     * Determine if the current request is asking for paginated in return
     *
     * @return bool
     */
    protected function wantsPagination()
    {
        return request()->exists(['per_page']);
    }


}
