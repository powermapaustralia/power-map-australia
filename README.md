# Power Map Australia

A no-cost static transparency website prototype for mapping Australian political donations, business interests, policy alignment, and possible public benefit/cost.

## Free hosting

1. Create a GitHub account.
2. Create a new public repository called `power-map-australia`.
3. Upload all files in this folder.
4. Go to Settings → Pages.
5. Set Source to `Deploy from branch`, branch `main`, folder `/root`.
6. Your site will publish at `https://YOUR-USERNAME.github.io/power-map-australia/`.

## Editing data

Edit `data/profiles.json`. Add profiles using the existing structure.

## Source rules

Use primary sources first:
- AEC Transparency Register: https://transparency.aec.gov.au/
- AEC disclosure downloads: https://transparency.aec.gov.au/Download
- They Vote For You: https://theyvoteforyou.org.au/
- OpenAustralia: https://www.openaustralia.org.au/

## Legal wording

Safe wording:
- may benefit
- has exposure to
- policy alignment
- raises conflict-of-interest questions
- possible public cost

Avoid unless proven:
- bribed
- corrupt
- bought policy
- criminal
- war profiteer

## Next build steps

- Replace TBC donation rows with verified AEC data.
- Add a source field for every claim.
- Add profile pages for 20 major donors/entities.
- Add CSV import from AEC downloads.
