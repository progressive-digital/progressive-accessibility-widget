# Contributing and releases

## Changes

1. Create a focused branch from the current `master`.
2. Open a pull request before the branch is merged.
3. Keep the change, generated distribution files, tests and changelog in the
   same pull request.
4. Wait for the `Library quality / quality` check and one approving code-owner
   review.
5. Merge the pull request. Do not push implementation commits directly to
   `master`.

The CI workflow is deliberately small: one Node version, locked installation,
build, tests and dependency audit with a five-minute timeout. This protects the
monthly GitHub Actions budget while still checking the published artifacts.

## Releases

Releases are cut only from a reviewed commit already present on `master`:

1. Include the intended version in `package.json`, `package-lock.json` and
   `CHANGELOG.md` in the pull request.
2. After merge, create the annotated `vX.Y.Z` tag on that merge commit.
3. Push the tag and create the GitHub release with concise release notes.
4. Update downstream consumers, including the Drupal.org module, in their own
   reviewed change.

Do not move an existing public release tag. If an urgent direct change is ever
unavoidable, document the exception and open a follow-up pull request for the
missing review and process correction.

## Drupal.org module

The Drupal.org project is a separate repository and release. Its
`composer.libraries.json` must reference the published Sienna tag before a new
Drupal.org module version is tagged. A maintainer with Drupal.org access reviews
and publishes that change independently.
