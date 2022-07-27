#!/usr/bin/env bash

[ ! -f out.json ] ||   rm -r out.json

if ! command -v xml2json &>/dev/null; then
  echo "xml2json command not found"
  exit 1
fi

if ! command -v jq &>/dev/null; then
  echo "jq command not found"
  exit 1
fi

if ! xml2json junit.xml &>/dev/null; then
  echo "Failed to convert $1 to json"
  exit 1
fi

if [[ -f out.json ]]; then
  results=$(cat out.json | jq -r ".testsuites.testsuite | length")

  for ((i = 0; i < $results; i++)); do
    test_name=$(cat out.json | jq -r ".testsuites.testsuite[$i].name")
    errors=$(cat out.json | jq -r ".testsuites.testsuite[$i].errors")
    failures=$(cat out.json | jq -r ".testsuites.testsuite[$i].failures")
    if [[ $failures == "0" && $errors == "0" ]]; then
      echo "$test_name succeeded"
    else
      echo "Test $test_name failed"
      exit 1
    fi
  done
else
  exit 1
fi
