echo "uploading to Google Cloud Storage"
cd platforms/android/build/outputs/apk && gsutil cp android-debug.apk gs://george-moura-site.appspot.com/files/iblvapp.apk
echo "iblvapp.apk uploaded"
