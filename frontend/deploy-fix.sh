gcloud builds submit --tag gcr.io/backend-dbs-grp7/fe-fix
gcloud run deploy fe-fix --image gcr.io/backend-dbs-grp7/fe-fix --platform managed --allow-unauthenticated --region asia-southeast1