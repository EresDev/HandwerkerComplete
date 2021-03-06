<?php

declare(strict_types=1);

namespace App\Tests\Functional\Infrastructure\Controller;

use App\Domain\ValueObject\Uuid;
use App\Infrastructure\Service\Http\SuccessResponseContent;
use App\Tests\Shared\ObjectMother\JobMother;

class CreateJobControllerTest extends UpsertJobBaseTestCase
{
    /**
     * @dataProvider uriProvider
     */
    public function testHandleRequestForValidData(string $uri): void
    {
        $this->authenticateClient();

        $this->sendRequest(
            $uri,
            $this->getJobParameters()
        );
        $response = $this->response();
        $this->assertEquals(201, $response->getStatusCode());

        $expectedContent = new SuccessResponseContent(['job' => ['uuid']]);

        $this->assertTrue($expectedContent->hasValidFormat($response->getContent()));

        $responseObj = json_decode($response->getContent());

        $this->assertObjectHasAttribute('uuid', $responseObj->data->job);
        $this->assertNotNull($responseObj->data->job->uuid);
        $this->assertTrue(Uuid::isValid($responseObj->data->job->uuid));
    }

    protected function getJobParameters(): array
    {
        return JobMother::toValidParameterArray();
    }

    protected function getRequestMethod(): string
    {
        return 'post';
    }
}
