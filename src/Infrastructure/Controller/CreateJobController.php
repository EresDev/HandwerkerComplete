<?php

declare(strict_types=1);

namespace App\Infrastructure\Controller;

use App\Application\Command\CreateJobCommand;
use App\Application\CommandHandler\CreateJobHandler;
use App\Application\Service\Extension\DateTimeExtension;
use App\Application\Service\Security\Security;
use App\Application\Service\Translator;
use App\Domain\Entity\User;
use App\Domain\Exception\DomainException;
use App\Domain\Exception\ValidationException;
use App\Domain\ValueObject\Uuid;
use App\Infrastructure\Service\Http\ErrorResponseContent;
use App\Infrastructure\Service\Http\FailureResponseContent;
use App\Infrastructure\Service\Http\SuccessResponseContent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class CreateJobController
{
    private Request $request;
    private Translator $translator;
    private CreateJobHandler $handler;
    private User $user;

    public function __construct(
        RequestStack $requestStack,
        Translator $translator,
        CreateJobHandler $handler,
        Security $security
    ) {
        $this->request = $requestStack->getCurrentRequest();
        $this->translator = $translator;
        $this->handler = $handler;
        $this->user = $security->getUser();
    }

    public function handleRequest(): JsonResponse
    {
        $uuid = Uuid::create();

        $executionTimestamp = (int)$this->request->get('executionDateTime', 0);
        try {
            $command = new CreateJobCommand(
                $uuid,
                $this->request->get('title', ''),
                $this->request->get('zipCode', ''),
                $this->request->get('city', ''),
                $this->request->get('description', ''),
                DateTimeExtension::from($executionTimestamp),
                Uuid::createFrom($this->request->get('categoryId', '')),
                $this->user
            );
            $this->handler->handle($command);
        } catch (ValidationException $exception) {
            return JsonResponse::create(
                new FailureResponseContent($exception->getViolations()),
                422
            );
        } catch (DomainException $exception) {
            return JsonResponse::create(
                new ErrorResponseContent(
                    $this->translator->translate($exception->getViolation())
                ),
                422
            );
        }

        return JsonResponse::create(
            new SuccessResponseContent(['job' => ['uuid' => $uuid->getValue()]]),
            201
        );
    }

    private function getDateTimeFrom($timestamp): \DateTime
    {
        return (new \DateTime())
            ->setTimestamp(
                $timestamp
            );
    }
}
