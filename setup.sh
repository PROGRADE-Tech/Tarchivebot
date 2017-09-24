#!/bin/sh
########################################
# GLOBALS
STATUS_PREFIX=":>"
DBEX="db/tarchive.db.example"
DB="db/tarchive.db"
CFGEX="config/config.json.example"
CFG="config/config.json"
DBEX_EXISTS=true
DB_EXISTS=true
CFGEX_EXISTS=true
CFG_EXISTS=true

########################################
# CHECKS
if [ ! -f "$DBEX" ]; then
  DBEX_EXISTS=false
fi
if [ ! -f "$DB" ]; then
  DB_EXISTS=false
fi
if [ ! -f "$CFGEX" ]; then
  CFGEX_EXISTS=false
fi
if [ ! -f "$CFG" ]; then
  CFG_EXISTS=false
fi

########################################
# PROGRAM START WITH WELCOME PROMPT
printf "$DB $DB_EXISTS Starting Tarchivebot setup...\nChecking for files...\n"
printf "$STATUS_PREFIX\t'$DB':\t\t"

########################################
# CHECKS FOR DB FILE
if [ "$DB_EXISTS" = true ]; then
  printf "OK\n"
else
  printf "NOT FOUND\n"
  if [ "$DBEX_EXISTS" = true ]; then
    printf "$STATUS_PREFIX\t! Copy '$DBEX' to '$DB'? (Y/n) "
    read answer
    if echo "$answer" | grep -iq "^y"; then
      cp -i $DBEX $DB
    else
      printf "$STATUS_PREFIX\t\tskipping...\n"
    fi
  else
    printf ":>\t'$DBEX'\tNOT FOUND EITHER\n"
  fi
fi

printf "$STATUS_PREFIX\t'config/config.json':\t\t"

########################################
# CHECKS FOR CONFIG FILE
if [ "$CFG_EXISTS" = true ]; then
  printf "OK\n"
else
  printf "NOT FOUND\n"
  if [ "$CFGEX_EXISTS" = true ]; then
    printf "$STATUS_PREFIX\t! Copy '$CFGEX' to '$CFG'? (Y/n) "
    read answer
    if echo "$answer" | grep -iq "^y"; then
      cp -i $CFGEX $CFG
      # PROMPT TO REPLACE DEFAULT TELEGRAM KEY
      printf "$STATUS_PREFIX\t! Enter your Telegram Key (enter to skip): "
      read answer_key
      if [ -n "$answer_key" ]; then
        sed -i -- "s/abcdefghi:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/$answer_key/g" $CFG
      else
        printf "$STATUS_PREFIX\t\tskipping Telegram key...\n"
      fi
    else
      printf "$STATUS_PREFIX\t\tskipping...\n"
    fi
  else
    printf ":>\t'$CFGEX'\tNOT FOUND EITHER\n"
  fi
fi
