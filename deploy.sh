#!/bin/bash

# Kullanıcıdan commit mesajını al
read -p "Commit mesajını girin: " commit_message

# Değişiklikleri ekle
git add .

# Commit yap
git commit -m "$commit_message"

# Değişiklikleri push et
git push

sleep 3

WORKFLOW_NAME="firebase-hosting-merge.yml"

# Haal de meest recente run ID op
LATEST_RUN_ID=$(gh run list --workflow $WORKFLOW_NAME --json databaseId --jq '.[0].databaseId')

# Controleer of een ID is opgehaald
if [ -z "$LATEST_RUN_ID" ]; then
  echo "Geen recente runs gevonden voor workflow: $WORKFLOW_NAME"
  exit 1
fi

# Voer gh run watch uit met het opgehaalde ID en vang eventuele fouten op
echo "Volgen van run met ID: $LATEST_RUN_ID"
gh run watch $LATEST_RUN_ID || {
  echo "Er is een fout opgetreden bij het volgen van de run met ID: $LATEST_RUN_ID"
  echo "Details van de fout:"
  gh run view $LATEST_RUN_ID --log
  exit 1
}