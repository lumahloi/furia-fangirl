#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[skip vercel]"* ]]; then
  echo "🛑 - Build cancelled due to [skip vercel] tag"
  exit 0
fi

# Optional: You can also still block builds on main if you want
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ - Build can proceed on main"
  exit 1
else
  echo "✅ - Build can proceed on other branches"
  exit 1
fi
