(posting,
  FinancialsTransaction(268,0,200,331011,
    2016-04-24T22:00:00Z,
2019-03-18T23:00:00Z,
2019-02-24T23:00:00Z,
  201604,
  false,112,1000,
EREF+ZAHLUNGSBELEG 209112544206MREF+DE000205000610000000000000006118189CRED+DE93ZZZ00000078611SVWZ+MOBILFUNK KUNDENKONTO000051640140 0010191276012711/11.04.16ABWE+Kaba Soft GmbHXXX,
  20,-1,
  List(FinancialsTransactionDetails(402,268,1406,true,331011,8.85,2016-04-24T18:00:00Z,
EREF+ZAHLUNGSBELEG 209112544206MREF+DE000205000610000000000000006118189CRED+DE93ZZZ00000078611SVWZ+MOBILFUNK KUNDENKONTO000051640140 0010191276012711/11.04.16ABWE+Kaba Soft GmbHXX,EUR,1000),
FinancialsTransactionDetails(5158,268,078,true,077,100,2020-05-22T13:38:24Z,TESTS,EUR,1000),
FinancialsTransactionDetails(401,268,6810,true,331011,46.56,2016-04-25T20:00:00Z,
EREF+ZAHLUNGSBELEG 209112544206MREF+DE000205000610000000000000006118189CRED+DE93ZZZ00000078611SVWZ+MOBILFUNK KUNDENKONTO000051640140 0010191276012711/11.04.16ABWE+Kaba Soft GmbHXX,EUR,1000))))
import java.time.OffsetDateTime

import java.time.temporal.ChronoField
import java.time.format.DateTimeFormatter
import java.time.Instant
import java.time.ZoneId
import java.util.Locale
import java.time.LocalDateTime
import java.time.ZonedDateTime
val f = DateTimeFormatter.ofPattern ( "uuuuMMddHHmmss.SX").withLocale( Locale.GERMANY ).withZone( ZoneId.of("UTC"));
String input = "2016-04-24T22:00:00Z";
.withZone( ZoneId.of("UTC"));
val odt = OffsetDateTime.parse ( input , f );

val newDate = DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(LocalDateTime.now(ZoneId.of("GMT")));

val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
val timestamp = "2016-02-16 11:00:02";
val temporalAccessor = formatter.parse(timestamp);
val localDateTime = LocalDateTime.from(temporalAccessor);
val zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.of("UTC+1"));
val result = Instant.from(zonedDateTime);

import java.time.ZoneOffset

LocalDateTime.ofInstant(instant, ZoneOffset.UTC);


val period: Int = result.get(ChronoField.YEAR).toString.concat(
if (result.get(ChronoField.MONTH_OF_YEAR) < 10)
  "0".concat(result.get(ChronoField.MONTH_OF_YEAR).toString)
else result.get(ChronoField.MONTH_OF_YEAR).toString
).toInt
