#!/usr/bin/env bash
set -e

if ! command -v htpasswd >/dev/null 2>&1; then
  echo "htpasswd not installed" >&2
  exit 1
fi

user=$1
password=$2
if [ -z "$user" ] || [ -z "$password" ]; then
  echo "usage: $0 <user> <password>" >&2
  exit 1
fi

htpasswd -nbB "$user" "$password"
