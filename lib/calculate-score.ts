export function calculateScore(requiredServices: string[], nearbyServices: string[]) {
    let score = 0;
    let extraPoints = 0;

    requiredServices.forEach(requiredService => {
        // Count the number of services of this type
        const count = nearbyServices.filter(service => service === requiredService).length;

        // Add the count to the score
        score += count;

        // Extra points for each extra service
        extraPoints += Math.max(0, count - 1);
    });

    // Calculate score as a proportion of total possible score (assuming each required service is present once), scaled to 4
    const totalPossibleScore = requiredServices.length;
    const scaledScore = (score / totalPossibleScore) * 4;

    // Calculate score as a proportion of total possible score (assuming each required service is present once), scaled to 1
    const totalPossibleExtraPoints = requiredServices.length - 1;
    const scaledExtraPoints = (score / totalPossibleExtraPoints);

    return scaledScore + Math.min(scaledExtraPoints, 1);
}