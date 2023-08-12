gcloud builds submit --config cloudbuild-lite.yaml
gcloud run deploy backend-dbs-grp7 \
  --image gcr.io/backend-dbs-grp7/backend-dbs-grp7 \
  --region asia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars="AWS_KEY_LEFT=${AWS_KEY_LEFT},AWS_KEY_RIGHT=${AWS_KEY_RIGHT}" \
  --min-instances 1 \
  --max-instances 1