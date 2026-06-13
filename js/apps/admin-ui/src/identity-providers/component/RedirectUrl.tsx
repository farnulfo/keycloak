import {
  ClipboardCopy,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { HelpItem, useEnvironment } from "@keycloak/keycloak-ui-shared";
import { useRealm } from "../../context/realm-context/RealmContext";
import { addTrailingSlash } from "../../util";

export const RedirectUrl = ({ id }: { id: string }) => {
  const { environment } = useEnvironment();
  const { t } = useTranslation();

  const { realm, realmRepresentation } = useRealm();
  const callbackUrl = `${addTrailingSlash(
    environment.serverBaseUrl,
  )}realms/${realm}/broker`;
  const redirectUrl = `${callbackUrl}/${id}/endpoint`;
  const frontendUrl = realmRepresentation.attributes?.frontendUrl;
  const frontendRedirectUrl = frontendUrl
    ? `${addTrailingSlash(frontendUrl)}realms/${realm}/broker/${id}/endpoint`
    : undefined;
  const showFrontendUrlWarning =
    frontendRedirectUrl !== undefined &&
    frontendRedirectUrl !== redirectUrl;

  return (
    <FormGroup
      label={t("redirectURI")}
      labelIcon={
        <HelpItem helpText={t("redirectURIHelp")} fieldLabelId="redirectURI" />
      }
      fieldId="kc-redirect-uri"
    >
      <ClipboardCopy isReadOnly>{redirectUrl}</ClipboardCopy>
      {showFrontendUrlWarning && (
        <FormHelperText>
          <HelperText>
            <HelperTextItem variant="warning">
              {t("redirectURIFrontendUrlWarning", {
                url: frontendRedirectUrl,
              })}
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      )}
    </FormGroup>
  );
};
