gcloud builds submit --config cloudbuild-lite.yaml
gcloud run deploy backend-dbs-grp7 \
  --image gcr.io/backend-dbs-grp7/backend-dbs-grp7 \
  --region asia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars="AWS_KEY_LEFT=AKIA6DSJFTLOIOEUJ37X,AWS_KEY_RIGHT=6ZcE5dIjz78HNfZbbR/oIPz2k99NMUGpGUZV0LT5" \
  --min-instances 1 \
  --max-instances 1
